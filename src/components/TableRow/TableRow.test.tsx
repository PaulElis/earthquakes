import TableRow from "./TableRow";

describe("Table Row", () => {
     test('expect TableHeader to match snapshot', () => {
          expect(TableRow).toMatchSnapshot();
     })
});
