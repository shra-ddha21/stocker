import React from "react";
import "./Users.css";

const Users = ({ users, uniqueStocks, onPingApi }) => {
  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="slideUp" id="main">
            <h2>Users</h2>
            <br />
            <br />
            <button id="submit" onClick={onPingApi}>
              Ping API
            </button>
            <br />
            <br />
            {users && Object.keys(users).length > 0 ? (
              <>
                {Object.entries(users).map(([userId, stocks]) => (
                  <div key={userId} className="user-table">
                    <table align="center">
                      <tbody>
                        <tr>
                          <td colSpan="2">User ID: {userId}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">Stocks:</td>
                        </tr>
                        {Object.entries(stocks).map(([stock, value]) => (
                          <tr key={stock}>
                            <td>{stock}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br />
                    <br />
                  </div>
                ))}
              </>
            ) : (
              <p>No users to display</p>
            )}

            {uniqueStocks && Object.keys(uniqueStocks).length > 0 && (
              <div>
                <strong>Unique Stocks: </strong>
                {Object.entries(uniqueStocks).map(([stock, price]) => (
                  <span key={stock}>{stock}, </span>
                ))}
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Users;
