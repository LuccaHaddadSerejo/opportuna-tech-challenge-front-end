import { render } from "@testing-library/react";
import WeatherWidget from "@/components/WeatherWidget/WeatherWidget";

describe("WeatherWidget Component", () => {
  test("renders without crashing", async () => {
    render(<WeatherWidget city="New York" date="2024-04-08" />);
  });

  test('displays "No weather information" when interval of days is greater than 6', async () => {
    const { getByText } = render(
      <WeatherWidget city="New York" date="2024-04-20" />
    );
    expect(getByText(/No weather information/)).toBeInTheDocument();
  });
});
