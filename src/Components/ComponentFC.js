import React, { useCallback, useState, useMemo } from "react";
import "./Common.scss";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";

function ComponentFC() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [commentList, setCommentList] = useState([]);
  const [rowCount, setRowCount] = useState([]);

  const currentPage = useMemo(() => {
    if (searchParams.get("page")) {
      return searchParams.get("page");
    }
    return 1;
  }, [searchParams]);

  const handleClickPage = useCallback(
    (page) => {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleFilterByName = useCallback(
    (e) => {
      const name = e.target.value;
      if (name) {
        getCommentList(searchParams.get("page"), 10, name);
      } else {
        getCommentList(1, 10);
      }
    },
    [searchParams]
  );

  const handleFilterByBody = useCallback((e) => {
    const body = e.target.value;
    if (body) {
      getCommentList(1, 10, null, body);
    } else {
      getCommentList(1, 10);
    }
  }, []);

  const getCommentList = (_page = 1, _limit = 10, name = null, body = null) => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments", {
        params: { name, body, _page, _limit },
      })
      .then((res) => {
        let length = res.headers["x-total-count"];
        setCommentList(res.data);

        setRowCount(length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommentList(currentPage, 10);
  }, [currentPage]);

  return (
    <div className="container">
      <div>full text filter</div>
      <table className="table">
        <thead className="header">
          <tr>
            <th>postId</th>
            <th>id</th>
            <th>
              <div className="header__search">
                <span>name</span>
                <input
                  type="text"
                  className="header__input"
                  onChange={handleFilterByName}
                />
              </div>
            </th>
            <th>
              <div className="header__search">
                <span>body</span>
                <input
                  type="text"
                  className="header__input"
                  onChange={handleFilterByBody}
                />
              </div>
            </th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {commentList.map(({ id, postId, name, email, body }) => (
            <tr key={id}>
              <td>{postId}</td>
              <td>{id}</td>
              <td>{name}</td>
              <td>{body}</td>
              <td>{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={rowCount}
          pageSize={10}
          onPageChange={(page) => handleClickPage(page)}
        />
      </div>
    </div>
  );
}

export default ComponentFC;
