import React from "react";
import axios from "axios";
import "./Common.scss";
import Pagination from "./Pagination";

class ComponentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentList: [], rowCount: 10, currentPage: 1 };
  }

  handleClickPage = (page) => {
    this.setState({ ...this.state, currentPage: page });
    this.getCommentList(page);
  };

  handleFilterByName = (e) => {
    const name = e.target.value;
    if (name) {
      this.getCommentList(this.state.currentPage, 10, name);
    } else {
      this.getCommentList(this.state.currentPage, 10);
    }
  };

  handleFilterByBody = (e) => {
    const body = e.target.value;
    if (body) {
      this.getCommentList(this.state.currentPage, 10, null, body);
    } else {
      this.getCommentList(this.state.currentPage, 10);
    }
  };

  getCommentList = (_page = 1, _limit = 10, name = null, body = null) => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments", {
        params: { name, body, _page, _limit },
      })
      .then((res) => {
        const length = res.headers["x-total-count"];
        this.setState({
          ...this.state,
          commentList: res.data,
          rowCount: length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCommentList(this.state.currentPage, 10);
  }

  render() {
    return (
      <div className="container">
        <div>class component full text filter</div>
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
                    onChange={this.handleFilterByName}
                  />
                </div>
              </th>
              <th>
                <div className="header__search">
                  <span>body</span>
                  <input
                    type="text"
                    className="header__input"
                    onChange={this.handleFilterByBody}
                  />
                </div>
              </th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.commentList.map(({ id, postId, name, email, body }) => (
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
            currentPage={this.state.currentPage}
            totalCount={this.state.rowCount}
            pageSize={10}
            onPageChange={(page) => this.handleClickPage(page)}
          />
        </div>
      </div>
    );
  }
}
export default ComponentClass;
