import TableHeader from "./TableHeader";

describe("Table Header", () => {
     test('expect TableHeader to match snapshot', () => {
          expect(TableHeader).toMatchSnapshot();
     })
});
