import { useContext } from "react";
import { UserContext } from "../../App";
import { TransactionForm } from "./transactionForm";
import { useState, useEffect } from "react";
import {
  getTransactionById,
  getTransactionByStatus,
} from "../../api/transactionApi";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

//ONLY for pending, allow for edits of the transaction details

export const TransactionList = () => {
  const currentUser = useContext(UserContext);

  const [aTransactions, setaTransactions] = useState(undefined);
  const [dTransactions, setdTransactions] = useState(undefined);
  const [pTransactions, setpTransactions] = useState(undefined);
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
  }, []);

  //create 3 different api requests
    console.log("here");

  if (!aTransactions || !dTransactions || !pTransactions) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (currentUser.ceo_id) {
    return (
      <>
        <button className="btn"/>
      </>
    );
  }

  if (currentUser.role === "Employee") {
    return (
      <>
        {console.log("D Transactions")}
        {console.log(dTransactions)}
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
              <p>No available transaction</p>
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
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <p>No available transaction</p>
            )}
          </Tab>
        </Tabs>
      </>
    );
  }
};
