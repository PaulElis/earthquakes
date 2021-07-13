// import * as React from "react";
//import ReactDOM from "react-dom";
import { render, getByTestId, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook } from '@testing-library/react-hooks';

import mockEarthquakeData from "./assets/mockEarthquakeData";
import { EarthquakeApp, useEarthquakes, organizeEarthquakes, sortEarthquakes } from "./index";

describe("Earthquake App ", () => {
  
  test("matches snapshot", () => {
    const App = render(<EarthquakeApp />);
    expect(App).toMatchSnapshot();
  });

  test("header should have 5 columns and correct text", () => {
    const { container } = render(<EarthquakeApp />);
    const headerRow = getByTestId(container, "table-header-row");
    
    expect(headerRow.children.length).toBe(5);
    expect(headerRow.children[0].textContent).toBe("ID");
    expect(headerRow.children[1].textContent).toBe("Time");
    expect(headerRow.children[2].textContent).toBe("Location");
    expect(headerRow.children[3].textContent).toBe("Magnitude");
    expect(headerRow.children[4].textContent).toBe("More");
  });

  test("1st row should have 5 columns and correct text", () => {
    const { container } = render(<EarthquakeApp />);
    const tbody = getByTestId(container, "tbody");
    const firstRow = tbody.children[0];
    
    expect(firstRow.children.length).toBe(5);
    expect(firstRow.children[0].textContent).toBe("us2000a15p");
    expect(firstRow.children[1].textContent).toBe("July 25, 2017 @ 19:23");
    expect(firstRow.children[2].textContent).toBe("228km SSW of Bengkulu, Indonesia");
    expect(firstRow.children[3].textContent).toBe("5.3");
    expect(firstRow.children[4].textContent).toBe("Details");
  });
    
  test("should never have more than 20 results showing", () => {
    const { container } = render(<EarthquakeApp />);
    const tbody = getByTestId(container, "tbody");
    
    expect(tbody.children.length).toBe(20);
  });

  test("uses `useEarthquakes` hook to get the earthquakes", () => {
    const { result } = renderHook(() => useEarthquakes());

    expect(result.current.length).toBe(50);
  });

  test('clicking on details button should show you the longitude and latitude for the earthquake.', () => {
    const { container } = render(<EarthquakeApp />);
    const button = container.getElementsByClassName("closed-button")[0]

    fireEvent.click(button);
    const openDetailsRow = getByTestId(container, 'open-details-row')

    expect(openDetailsRow.textContent).toBe('Latitude -5.6622 Longitude 101.3798')
  })

  test('You can search the Earthquakes by **place**. Not by any other field. Doing so returns only sorted earthquakes that match the query.', () => {
    const result = organizeEarthquakes('alaska', mockEarthquakeData);
    const length = result.length;
    const includesQuery = result.every(earthquake => earthquake.place.toLowerCase().includes('alaska'))

    expect(length).toBe(10);
    expect(includesQuery).toBeTruthy();
  })

  test('The earthquakes should be sorted by **highest magnitude to lowest magnitude**. In the event of a tie, you should sort by **most recent to oldest**.', () => {
    const earthquakes = [
      {
        time: "2017-09-01T23:00:17.250Z",
        latitude: 42.5339,
        longitude: -111.4026,
        depth: 5,
        mag: 3.5,
        magType: "ml",
        nst: "",
        gap: 27,
        dmin: 0.321,
        rms: 0.83,
        net: "us",
        id: "us2000ages",
        updated: "2017-09-06T01:27:54.040Z",
        place: "21km SE of Soda Springs, Idaho",
        type: "earthquake",
        horizontalError: 3.4,
        depthError: 2,
        magError: 0.035,
        magNst: 106,
        status: "reviewed",
        locationSource: "us",
        magSource: "us",
      },
      {
        time: "2017-09-03T18:36:47.870Z",
        latitude: 42.6088,
        longitude: -111.4202,
        depth: 5,
        mag: 3.5,
        magType: "ml",
        nst: "",
        gap: 47,
        dmin: 0.283,
        rms: 0.73,
        net: "us",
        id: "us2000af80",
        updated: "2017-09-03T23:32:39.040Z",
        place: "15km ESE of Soda Springs, Idaho",
        type: "earthquake",
        horizontalError: 2.3,
        depthError: 1.9,
        magError: 0.045,
        magNst: 64,
        status: "reviewed",
        locationSource: "us",
        magSource: "us",
      },
      {
        time: "2017-09-05T18:36:47.870Z",
        latitude: 42.6088,
        longitude: -111.4202,
        depth: 5,
        mag: 4,
        magType: "ml",
        nst: "",
        gap: 47,
        dmin: 0.283,
        rms: 0.73,
        net: "us",
        id: "us2000af80",
        updated: "2017-09-03T23:32:39.040Z",
        place: "15km ESE of Soda Springs, Idaho",
        type: "earthquake",
        horizontalError: 2.3,
        depthError: 1.9,
        magError: 0.045,
        magNst: 64,
        status: "reviewed",
        locationSource: "us",
        magSource: "us",
      },
    ];

    const firstElementInEarthquake = Object.entries(earthquakes)[0]['1'];
    const thirdElementInEarthquake = Object.entries(earthquakes)[2]['1'];

    const result = sortEarthquakes(earthquakes);
    
    const firstElementInResult = Object.entries(result)[0]['1'];
    const thirdElementInResult = Object.entries(result)[2]['1'];

    expect(firstElementInResult).toBe(thirdElementInEarthquake);
    expect(thirdElementInResult).toBe(firstElementInEarthquake);
  })
  
});

