import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Searchbar from "./root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchLocation } from "@/domains/location/hooks/use-search-location";
import { useRouter } from "next/navigation";
import { getWeatherPageUrl } from "@/domains/weather";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;
const mockPush = jest.fn();

jest.mock("../../../domains/location/hooks/use-search-location", () => ({
  useSearchLocation: jest.fn(),
}));
const mockUseSearchLocation = useSearchLocation as jest.Mock;

const mockLocationData = {
  id: 12345,
  name: "London",
  admin1: "England",
  admin2: "Greater Britain",
  country: "United Kingdom",
  timezone: "Europe/London",
  latitude: 10,
  longitude: 10,
};

function createMockSearchLocation(overrides = {}) {
  return {
    data: [],
    isTyping: false,
    isFetching: false,
    isPaused: false,
    ...overrides,
  };
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

function setup() {
  const user = userEvent.setup();
  renderWithProviders(<Searchbar />);
  const input = screen.getByPlaceholderText("Search for a place...");

  return { user, input };
}

describe("Searchbar", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseSearchLocation.mockReturnValue(createMockSearchLocation());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("input behavior", () => {
    it("should render search input", () => {
      setup();

      expect(
        screen.getByPlaceholderText("Search for a place..."),
      ).toBeInTheDocument();
    });

    it("should allow user to type", async () => {
      const { user, input } = setup();

      await user.type(input, "London");

      expect(input).toHaveValue("London");
    });

    it("should clear input when clicking clear button", async () => {
      const { user, input } = setup();
      const button = screen.getByRole("button", { name: /clear input/i });

      await user.type(input, "Berlin");
      expect(input).toHaveValue("Berlin");

      await user.click(button);

      expect(input).toHaveValue("");
    });
  });

  describe("status display", () => {
    it("should display typing indicator when user is typing", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          isTyping: true,
        }),
      );
      const { user, input } = setup();

      await user.type(input, "Lo");

      expect(screen.getByText(/typing/i)).toBeInTheDocument();
    });

    it("should display loading indicator when fetching data", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          isFetching: true,
        }),
      );
      const { user, input } = setup();

      await user.type(input, "Be");

      expect(await screen.findByText(/loading/i)).toBeInTheDocument();
    });

    it("should show status when character is less than 2", async () => {
      const { user, input } = setup();

      await user.type(input, "A");

      expect(
        await screen.findByText("Search input should be 2 characters or more!"),
      ).toBeInTheDocument();
    });

    it("should show status when place is not found", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          data: [],
        }),
      );
      const { user, input } = setup();

      await user.type(input, "zz");

      expect(await screen.findByText(/Place not found!/i)).toBeInTheDocument();
    });

    it("should show status when no network", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          isPaused: true,
        }),
      );
      const { user, input } = setup();

      await user.type(input, "zz");

      expect(
        await screen.findByText(/No network connection!/i),
      ).toBeInTheDocument();
    });
  });

  describe("location results", () => {
    it("should display available location", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          data: [mockLocationData],
        }),
      );
      const { user, input } = setup();

      await user.type(input, mockLocationData.name);

      expect(
        await screen.findByText(mockLocationData.name),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(
          `${mockLocationData.admin2}, ${mockLocationData.admin1}, ${mockLocationData.country}`,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("should redirect to weather page when clicking location", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          data: [mockLocationData],
        }),
      );
      const { user, input } = setup();

      await user.type(input, mockLocationData.name);
      const location = await screen.findByText(mockLocationData.name);
      await user.click(location);

      expect(mockPush).toHaveBeenCalledWith(
        getWeatherPageUrl(mockLocationData),
      );
    });

    it("should not allow selecting location when still loading", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({
          isFetching: true,
          data: [mockLocationData],
        }),
      );
      const { user, input } = setup();

      await user.type(input, "Lon");

      expect(screen.queryByText(mockLocationData.name)).not.toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should not redirect when no location is available", async () => {
      mockUseSearchLocation.mockReturnValue(
        createMockSearchLocation({ data: [] }),
      );

      const { user, input } = setup();

      await user.type(input, "zz");

      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
