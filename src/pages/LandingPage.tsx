import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Box from "../components/Box";
import Table from "../components/Table";
import TableBody from "../components/TableBody";
import TableCell from "../components/TableCell";
import TableHead from "../components/TableHead";
import TablePagination from "../components/TablePagination";
import TableRow from "../components/TableRow";
import TableToolbar from "../components/TableToolbar";
import Text from "../components/Text";
import { getCodeList } from "../services/coreService";
import { useDebounce } from "../hooks/useDebounce";

interface ITableFilter {
  limit: number;
  search: string;
  offset: number;
}

const initialState = {
  limit: 10,
  search: "",
  offset: 0
};

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 10px #aaaaaa;
  background: linear-gradient(0deg, #eeeeee 0, white 20%);
  margin-bottom: 2rem;

  & img {
    max-height: 140px;
  }
`;

const Body = styled(Text)`
  letter-spacing: 1px;
`;

const Footer = styled.div`
  background: linear-gradient(0deg,#eeeeee 0,white 100%);
  box-shadow: 0 6px 6px #aaaaaa;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 30px 20px 50px;
`;

const LandingPage = () => {
  const [filter, setFilter] = useState<ITableFilter>(initialState);
  const [data, setData] = useState<any[]>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceValue = useDebounce(filter, 300);

  useEffect(() => {
    setIsLoading(true);
    getCodeList(debounceValue).then(({data, totalCount}: any) => {
      setData(data);
      setTotalCount(totalCount);
      setIsLoading(false);
    });
  }, [debounceValue]);

  const header = (
    <Header>
      <img src="/img/header-image.jpg" alt="header" />
      <Text paddingLeft={170} size={18} color="#666666" weight="bold" lineHeight={45}>
        Overview
      </Text>
    </Header>
  );

  const content = (
    <Box>
      <Text size={30} lineHeight={100}>
        Mobile Country Codes (MCC) and Mobile Network Codes (MNC)
      </Text>
      <br/>
      <Body lineHeight={30}>
        Mobile Country Codes (MCC) are used in wireless telephone networks (GSM, CDMA, UMTS, etc.) in order to identify the country which a mobile subscriber belongs to. In order to uniquely identify a mobile subscribers network the MCC is combined with a Mobile Network Code (MNC). The combination of MCC and MNC is called HNI (Home network identify) and is the combination of both in one string (e.g. MCC=262 and MNC=01 results in an HNI of 26201). If you combine the HNI with the MSIN (Mobile Subscriber Identification Number) the result is the so called IMSI (integrated mobile subscriber identify). Below you can browse/search the list of countries and their MCCs for free in order to identify any MCC, MNC or HNI of the world.
      </Body>
      <br/>
      <Body lineHeight={130}>
        Mcc-mnc.com is a service by
        <Text color="#fd9b1e">&nbsp;SMScarrier.EU&nbsp;</Text>
        and powered by
        <Text color="#fd9b1e">&nbsp;interactive digital media GmbH&nbsp;</Text>
      </Body>
    </Box>
  );

  const tableHead = (
    <TableHead>
      <TableRow>
        <TableCell>MCC</TableCell>
        <TableCell>MNC</TableCell>
        <TableCell>ISO</TableCell>
        <TableCell>Country</TableCell>
        <TableCell>Country Code</TableCell>
        <TableCell>Network</TableCell>
      </TableRow>
    </TableHead>
  );

  const tableBody = (
    <TableBody>
      {data !== undefined && data.map((rowData: any, index: number) => (
        <TableRow key={index}>
          <TableCell>{rowData.mcc ? rowData.mcc : 0}</TableCell>
          <TableCell>{rowData.mnc ? rowData.mnc : 0}</TableCell>
          <TableCell>{(rowData.country && rowData.country.iso) ? rowData.country.iso : ""}</TableCell>
          <TableCell>{(rowData.country && rowData.country.name) ? rowData.country.name : ""}</TableCell>
          <TableCell>{(rowData.country && rowData.country.countryCode) ? rowData.country.countryCode: ""}</TableCell>
          <TableCell>{rowData.name ? rowData.name : ""}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  const table = (
    <Box paddingBottom={50}>
      <TableToolbar filter={filter} onFilterChange={setFilter} />
      <Table>
        {tableHead}
        {totalCount > 0 ? tableBody : (
          <Text size={25} lineHeight={80}>
            {isLoading ? "Loading..." : "There is no data exist."}
          </Text>
        )}
      </Table>
      <TablePagination filter={filter} onFilterChange={setFilter} totalCount={totalCount} />
    </Box>
  );

  const footer = (
    <Footer>
      <Box flex flexDirection="column" width="45px" align="center">
        <img src="/img/logo.png" width={45} height={45} style={{ marginBottom: 4 }} alt="footer" />
        <Text color="#999999" size={10}>
          Associate Member
        </Text>
      </Box>
      <Box>
        <Text color="#999999" size={12}>
          mcc-mnc.com | @ 2011-2013 by
        </Text>
        <Text color="#666666" size={12}>
          interactive digital media GmbH
        </Text>
        <Text color="#999999" size={12}> | GERMANY: Lübeck || UNITED ARAB EMIRATES: Dubai</Text>
      </Box>
    </Footer>
  );

  return (
    <PageWrapper>
      {header}
      {content}
      {table}
      {footer}
    </PageWrapper>
  );
};

export default LandingPage;
