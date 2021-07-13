import "./TableHeader.scss";

export default function TableHeader() {
  return (
    <thead>
      <tr data-testid='table-header-row'>
        <td className="cell">ID</td>
        <td className="cell">Time</td>
        <td className="cell">Location</td>
        <td className="cell">Magnitude</td>
        <td className="cell">More</td>
      </tr>
    </thead>
  );
}