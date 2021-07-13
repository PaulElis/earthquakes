import { useState } from "react";
import Moment from "moment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import "./TableRow.scss";

interface Props {
  id: string;
  time: string;
  location: string;
  magnitude: number;
  latitude: number;
  longitude: number;
}

export default function TableRow({
  id,
  time,
  location,
  magnitude,
  latitude,
  longitude
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className={open ? "open-row" : "closed-row"}>
        <td className="table-cell">{id}</td>
        <td className="table-cell">
          {Moment(time).format("MMMM D, YYYY @ kk:mm")}
        </td>
        <td className="table-cell">{location}</td>
        <td className="table-cell">{magnitude}</td>
        <td className={open ? "open-cell table-cell" : "table-cell"}>
          <button
            className={open ? "open-button" : "closed-button"}
            onClick={() => setOpen(!open)}
            data-testid="details-button"
          >
            Details
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </button>
        </td>
      </tr>
      {open && (
        <tr className="open-details-row" data-testid="open-details-row">
          <td colSpan={6} className="open-details-data">
            Latitude {latitude} Longitude {longitude}
          </td>
        </tr>
      )}
    </>
  );
}
