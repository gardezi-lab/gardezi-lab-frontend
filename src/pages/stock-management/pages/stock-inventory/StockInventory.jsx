import { useEffect, useState } from "react";
import httpClient from "../../../../services/httpClient";
import StockInventoryTable from "../../others/table/stock-inventory/StockInventoryTable";
import { Pagination } from "react-bootstrap";

export default function StockInventory() {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordPerPage = 10;

  const getStockData = async () => {
    setLoading(true);
    try {
      const url = `/inventory/all?&currentpage=${page}&recordperpage=${recordPerPage}`;
      const response = await httpClient.get(url);

      // const response = await httpClient.get("/inventory/all");
      setStockList(response.data);
      setTotalPages(response.totalPages);


    } catch (err) {
      console.error("Fetch Stock Purchase Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStockData();
  }, [page]);
  const renderPaginationItems = () => {
    let items = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
            {i}
          </Pagination.Item>
        );
      }
    } else {
      items.push(
        <Pagination.Item key={1} active={page === 1} onClick={() => setPage(1)}>
          1
        </Pagination.Item>
      );

      if (page > 3) items.push(<Pagination.Ellipsis key="start-ellipsis" />);

      if (page > 2 && page < totalPages - 1) {
        items.push(
          <Pagination.Item key={page} active onClick={() => setPage(page)}>
            {page}
          </Pagination.Item>
        );
      }

      if (page < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" />);

      items.push(
        <Pagination.Item
          key={totalPages}
          active={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    return items;
  };


  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <h5 className="fw-bold page-header">Inventory</h5>
      </div>

      <StockInventoryTable
        stockList={stockList}
        loading={loading}
      />
      <div className="d-flex justify-content-end mt-2">

        <Pagination>
          <Pagination.Prev
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Pagination.Prev>
          {renderPaginationItems()}
          <Pagination.Next

            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
}
