import { useContext } from "react";
import { UserContext } from "../../App";
import { TransactionForm } from "./transactionForm";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTransactionByStatus,
  getSortTransactionByStatus,
  updateTransactionStatus,
  updateTransactionComment,
  getTransactionsByCompany,
  deleteTransaction,
} from "../../api/transactionApi";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { EditTransaction } from "./editTransaction";
import { AppealTransaction } from "./appealTransaction";

//ONLY for pending, allow for edits of the transaction details

export const TransactionList = () => {


  const currentUser = useContext(UserContext);

  const [transactions, setTransactions] = useState(undefined);
  const [aTransactions, setaTransactions] = useState(undefined);
  const [dTransactions, setdTransactions] = useState(undefined);
  const [pTransactions, setpTransactions] = useState(undefined);
  const [apTransactions, setapTransactions] = useState(undefined);
  const [sortValue, setSortValue] = useState("Sort By");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) =>
      setaTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Denied").then((x) =>
      setdTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Pending").then((x) =>
      setpTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) =>
      setapTransactions(x)
    );

  }, []);

useEffect(() => {
  if (sortValue != "Sort By") {
    getSortTransactionByStatus(
      currentUser.employee_id,
      "Accepted",
      sortValue
    ).then((x) => setaTransactions(x));
    getSortTransactionByStatus(
      currentUser.employee_id,
      "Denied",
      sortValue
    ).then((x) => setdTransactions(x));
    getSortTransactionByStatus(
      currentUser.employee_id,
      "Pending",
      sortValue
    ).then((x) => setpTransactions(x));
    getSortTransactionByStatus(
      currentUser.employee_id,
      "Appealed",
      sortValue
    ).then((x) => setapTransactions(x));
  } else {
    getTransactionByStatus(currentUser.employee_id, "Accepted").then((x) =>
      setaTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Denied").then((x) =>
      setdTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Pending").then((x) =>
      setpTransactions(x)
    );
    getTransactionByStatus(currentUser.employee_id, "Appealed").then((x) =>
      setapTransactions(x)
    );
  }
}, [sortValue, pTransactions]);

const sortBy = (e) => {
  setSortValue(e);
};

//create 3 different api requests
if (!aTransactions || !dTransactions || !pTransactions ||!apTransactions) {
  return (
    <>
      <p>Loading...</p>
    </>
  );
}

if (currentUser.role === "Employee")
  return (
    <>
      <Dropdown
        className="mt-2"
        onSelect={(e) => {
          setSortValue(e);
        }}
      >
        <Dropdown.Toggle className="col-12" variant="info" id="dropdown-menu">
          {sortValue}
        </Dropdown.Toggle>
        <Dropdown.Menu className="col-12">
          <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
          <Dropdown.Item eventKey="Amount">Amount</Dropdown.Item>
          <Dropdown.Item eventKey="Category">Category</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pending" title="Pending">
          {pTransactions.length !== 0 ? (
            <ListGroup>
              {pTransactions.map((transaction, index) => {
                return (
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col className="p-0">{transaction.order_date}</Col>
                        <Col>
                          <Badge bg="secondary" className="">
                            {transaction.claim_status}
                          </Badge>{" "}
                        </Col>
                      </Row>

                      <Row>
                        Amount Requested: ${transaction.amount_requested}
                      </Row>

                      <Row>
                        Claim Description:
                        <br />
                        {transaction.claim_description}
                      </Row>
                    </Container>

                    <Button type="button" onClick={() => {
                      navigate('/editTransaction', { state: { transaction } });
                    }}>Edit</Button>

                    <Button type="button" onClick={() => {
                      deleteTransaction(transaction.claim_number);
                    }}>Delete</Button>

                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p>No available transaction</p>
          )}
        </Tab>

        <Tab eventKey="accepted" title="Accepted">
          {aTransactions.length !== 0 ? (
            <ListGroup>
              {aTransactions.map((transaction, index) => {
                return (
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col className="p-0">{transaction.order_date}</Col>
                        <Col>
                          <Badge bg="secondary" className="">
                            {transaction.claim_status}
                          </Badge>{" "}
                        </Col>
                      </Row>

                      <Row>
                        Amount Requested: ${transaction.amount_requested}
                      </Row>

                      <Row>
                        Amount Reimbursed: ${transaction.amount_reimbursed}
                      </Row>

                      <Row>
                        Claim Description:
                        <br />
                        {transaction.claim_description}
                      </Row>

                      <Row>
                        Ceo Comment:
                        <br />
                        {transaction.ceo_comment}
                      </Row>
                    </Container>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p className="ms-3">No available transaction</p>
          )}
        </Tab>


        <Tab eventKey="denied" title="Denied">
          {dTransactions.length !== 0 ? (
            <ListGroup>
              {dTransactions.map((transaction, index) => {
                return (
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col className="p-0">{transaction.order_date}</Col>
                        <Col>
                          <Badge bg="secondary" className="">
                            {transaction.claim_status}
                          </Badge>{" "}
                        </Col>
                      </Row>

                      <Row>
                        Amount Requested: ${transaction.amount_requested}
                      </Row>

                      <Row>
                        Amount Reimbursed: ${transaction.amount_reimbursed}
                      </Row>

                      <Row>
                        Claim Description:
                        <br />
                        {transaction.claim_description}
                      </Row>

                      <Row>
                        Ceo Comment:
                        <br />
                        {transaction.ceo_comment}
                      </Row>

                    </Container>


                    <Button type="button" onClick={() => {
                      navigate('/appealTransaction', { state: { transaction } });
                    }}>Appeal</Button>

                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p className="ms-3">No available transaction</p>
          )}
        </Tab>
        <Tab eventKey="Appealed" title="Appeal">
          {apTransactions.length !== 0 ? (
            <ListGroup>
              {apTransactions.map((transaction, index) => {
                return (
                  <ListGroup.Item>
                    <Container>
                      <Row>
                        <Col className="p-0">{transaction.order_date}</Col>
                        <Col>
                          <Badge bg="secondary" className="">
                            {transaction.claim_status}
                          </Badge>{" "}
                        </Col>
                      </Row>

                      <Row>
                        Amount Requested: ${transaction.amount_requested}
                      </Row>

                      <Row>
                        Amount Reimbursed: ${transaction.amount_reimbursed}
                      </Row>

                      <Row>
                        Claim Description:
                        <br />
                        {transaction.claim_description}
                      </Row>

                      <Row>
                        Ceo Comment:
                        <br />
                        {transaction.ceo_comment}
                      </Row>
                    </Container>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p className="ms-3">No available transaction</p>
          )}
        </Tab>
      </Tabs>


    </>
  );
if (currentUser.ceo_id) {
  return (
    <>
      <ListGroup>
        {transactions.map((transaction, index) => {
          return (
            <ListGroup.Item>
              <Container>
                <Row>
                  <Col className="p-0">{transaction.order_date}</Col>
                  <Col>
                    <Badge bg="secondary" className="">
                      {transaction.claim_status}
                    </Badge>{" "}
                  </Col>
                </Row>

                <Row>
                  Amount Requested: ${transaction.amount_requested}
                </Row>

                <Row>
                  Amount Reimbursed: ${transaction.amount_reimbursed}
                </Row>

                <Row>
                  Claim Description:
                  <br />
                  {transaction.claim_description}
                </Row>
              </Container>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

    </>
  );
}
};
