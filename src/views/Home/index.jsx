import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Events from "../../components/Events";
import Navbar from "../../components/Navbar";
import useEventResults from "../../state/events-results";
// import useEventsData from "../../hooks/useEventsData";
import ReactPaginate from "react-paginate";
import styles from './Home.module.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, error, fetchEvents } = useEventResults();
    const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
    const page = useMemo(() => data?.page || {}, [data?.page]);
    
    const containerRef = useRef();

    useEffect(() => {
      fetchEvents();
    }, [fetchEvents]);

    const handleNavbarSearch = (term) => {
      setSearchTerm(term);
      fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(({ selected }) => {
      fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
    }, [searchTerm, fetchEvents]);

    const renderEvents = () => {
      if(isLoading) {
        return <div>Cargando...</div>;
      }
      if(error) {
        return <div>Error...</div>;
      }

      return (
        <div>
          <Events searchTerm={searchTerm} events={events} />
          <ReactPaginate 
            className={styles.pagination}
            nextClassName={styles.next}
            previousClassName={styles.previous}
            pageClassName={styles.page}
            activeClassName={styles.activePage}
            disabledClassName={styles.disabledPage}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={page.totalPages ? page.totalPages : 0}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      );
    };

    return (
      <>
        {isLoading ? null : <Navbar onSearch={handleNavbarSearch} ref={containerRef} />}
        {renderEvents()}
      </>
    )
};

export default Home;