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
import * as colors from "../colors";

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
  box-shadow: 0 0 10px ${colors.darkGrey};
  background: linear-gradient(0deg, #eeeeee 0, white 20%);
  margin: 2rem 0;

  & img {
    max-height: 140px;
  }

  @media screen and (max-width: 480px) {
    & img {
      max-height: 80px;
    }
  }
`;

const Body = styled(Text)`
  letter-spacing: 1px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 2rem 0;
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
      <Text paddingLeft={120} size={18} color="#666666" weight="bold" lineHeight={45}>
        Overview
      </Text>
    </Header>
  );

  const content = (
    <Box>
      <Box marginTop={50}>
        <Text size={30} lineHeight={40}>
          Mobile Country Codes (MCC) and Mobile Network Codes (MNC)
        </Text>
      </Box>
      <br/>
      <Box paddingBottom={30}>
        <Body lineHeight={30}>
          Mobile Country Codes (MCC) are used in wireless telephone networks (GSM, CDMA, UMTS, etc.) in order to identify the country which a mobile subscriber belongs to. In order to uniquely identify a mobile subscribers network the MCC is combined with a Mobile Network Code (MNC). The combination of MCC and MNC is called HNI (Home network identify) and is the combination of both in one string (e.g. MCC=262 and MNC=01 results in an HNI of 26201). If you combine the HNI with the MSIN (Mobile Subscriber Identification Number) the result is the so called IMSI (integrated mobile subscriber identify). Below you can browse/search the list of countries and their MCCs for free in order to identify any MCC, MNC or HNI of the world.
        </Body>
      </Box>
      <br/>
      <Box paddingBottom={50}>
        <Body lineHeight={30}>
          Mcc-mnc.com is a service by
          <Text color="#fd9b1e">&nbsp;SMScarrier.EU&nbsp;</Text>
          and powered by
          <Text color="#fd9b1e">&nbsp;interactive digital media GmbH&nbsp;</Text>
        </Body>
      </Box>
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
    <Box flex flexDirection="column" paddingBottom={50} marginTop={30}>
      <TableToolbar filter={filter} onFilterChange={setFilter} />
      <Table>
        {tableHead}
        {totalCount > 0 ? tableBody : (
          <Text size={25} lineHeight={80} color={colors.grey}>
            {isLoading ? "Loading..." : "There is no data exist."}
          </Text>
        )}
      </Table>
      <TablePagination filter={filter} onFilterChange={setFilter} totalCount={totalCount} />
    </Box>
  );

  const footer = (
    <Footer>
      <Box flex flexDirection="column" width="45px" align="center" marginRight={10}>
        <img src="/img/logo.png" width={40} height={60} style={{ marginBottom: 4 }} alt="footer" />
        <Text color="#999999" size={10}>
          Associate Member
        </Text>
      </Box>
      <Box align="right">
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
