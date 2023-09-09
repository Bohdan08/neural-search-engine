import SearchInput from "./components/SearchInput";
import TicketTable from "./components/TicketTable/TicketTable";
import { useSelector } from "react-redux";

const App = () => {
  const { searchTerm } = useSelector((store) => store.searchResults);

  return (
    <div className="h-screen w-screen bg-[#e1e2e1] flex justify-center">
      <div className="container p-10 lg:pt-44 mx-auto">
        <div className="bg-white rounded shadow-xl overflow-hidden w-[800px] max-w-full mx-auto my-auto">
          <div className="relative z-0">
            <SearchInput />
          </div>
          {!!searchTerm ? (
            <div className="pb-3 px-3 bg-white relative z-10">
              <TicketTable />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
