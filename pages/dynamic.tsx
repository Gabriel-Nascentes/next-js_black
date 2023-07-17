import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, ReactNode } from "react";

interface ApiResponse {
  name: string;
  timestamp: Date;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideData: ApiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((response) => response.json());
  return {
    props: {
      serverSideData,
    },
  };
};

const Dynamic: NextPage = (props: {
  children?: ReactNode;
  serverSideData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch("/api/hello").then((response) => response.json());
    setClientSideData(data);
  };
  return (
    <Container>
      <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>
      <Row>
        <Col>
          <h3>Gerado no servidor:</h3>
          <h2>{props.serverSideData?.timestamp.toString()}</h2>
        </Col>
        <Col>
          <h3>Gerado no cliente:</h3>
          <h2>{clientSideData?.timestamp.toString()}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Dynamic;
