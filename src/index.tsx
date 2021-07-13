import * as React from "react";
import * as ReactDOM from "react-dom";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";

// import Assignment from "./Assignment";

import mockEarthquakeData from "./assets/mockEarthquakeData";
// import mockOrganizedEarthquakeData from "./assets/mockOrganizedEarthquakeData";
// import mockSortedEarthquakeData from "./assets/mockSortedEarthquakeData";

/**
 * You will need to implement these two yourself!
 */
import TableRow from "./components/TableRow/TableRow";
import TableHeader from "./components/TableHeader/TableHeader";

import "./index.scss";
import "./fonts.scss";

const {useState} = React
const useStyles = makeStyles({
  input: {
    paddingBottom: 30
  },
  inputText: {
    color: "#aaa"
  },
  searchIcon: {
    paddingRight: 5
  }
});

/**
 * This hook will provide you with the earthquake data that you need.
 */
export function useEarthquakes() {
  return mockEarthquakeData;
}

interface Earthquake {
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  magType: string;
  nst: string | number;
  gap: string | number;
  dmin: string | number;
  rms: number;
  net: string | number;
  id: string;
  updated: string;
  place: string;
  type: string;
  horizontalError: string | number;
  depthError: number;
  magError: string | number;
  magNst: string | number;
  status: string;
  locationSource: string;
  magSource: string;
}

export function sortEarthquakes(earthquakes: Array<Earthquake>) {
  // Sort by magnitude
  earthquakes = earthquakes.sort(
    (a: Earthquake, b: Earthquake) => b.mag - a.mag
  );

  // Sort by recent if magnitudes are equal
  earthquakes = earthquakes.sort((a: Earthquake, b: Earthquake) => {
    if (a.mag === b.mag) {
      if (a.time < b.time) {
        return 1;
      } else if (b.time < a.time) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  return earthquakes;
}

/**
 * This function should take in earthquake data/current search and returns the sorted, filtered, and sliced list per the assignmen
 */
export function organizeEarthquakes(
  query: string,
  earthquakes: Array<Earthquake>
) {
  const originalEarthquakes = earthquakes;
  if (!query) return originalEarthquakes;

  // Search function
  earthquakes = earthquakes.filter((earthquake: Earthquake) => {
    if (earthquake.place.includes("of")) {
      if (
        earthquake.place.split("of")[1].trim().toLowerCase().includes(query)
      ) {
        return earthquake;
      } else {
        return false;
      }
    } else {
      return earthquake.place.trim().toLowerCase().includes(query);
    }
  });

  if (!earthquakes.length) {
    console.log("Please enter a valid location.");
    return originalEarthquakes;
  }

  sortEarthquakes(earthquakes);

  return earthquakes;
}

/**
 * Please use the two component files provided so the tests work properly!
 */
export const EarthquakeApp = () => {
  const styles = useStyles();
  const mockedEarthquakes = useEarthquakes();
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>(
    mockedEarthquakes
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEarthquakes = organizeEarthquakes(
      searchTerm.trim().toLowerCase(),
      mockedEarthquakes
    );
    if(newEarthquakes === mockedEarthquakes) setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000)
    setEarthquakes(newEarthquakes);
  };

  return (
    <div className="earthquakes">
      {/* <Assignment /> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          error={error && true}
          helperText={error && 'Please enter a valid location.'}
          id="outlined-basic"
          variant="outlined"
          size="small"
          className={styles.input}
          placeholder="Search by Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="disabled" className={styles.searchIcon} />
            )
          }}
        />
      </form>
      <table className="table">
        <TableHeader />
        <tbody data-testid="tbody" >
          {earthquakes.length > 0 &&
            sortEarthquakes(earthquakes)
              .slice(0, 20)
              .map((earthquake: Earthquake) => (
                <TableRow
                  key={earthquake.id}
                  id={earthquake.id}
                  data-testid="table-row"
                  time={earthquake.time}
                  location={earthquake.place}
                  magnitude={earthquake.mag}
                  latitude={earthquake.latitude}
                  longitude={earthquake.longitude}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  ReactDOM.render(<EarthquakeApp />, container);
}
