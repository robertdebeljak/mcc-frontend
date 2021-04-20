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
import {getCodeList} from "../services/coreService";
import {useDebounce} from "../hooks/useDebounce";
import * as colors from "../colors";
import {SORT_ORDER} from "../interfaces";

interface ITableFilter {
  limit: number;
  search: string;
  offset: number;
  sortOrder: SORT_ORDER;
  sortBy?: string;
}

const initialState = {
  limit: 10,
  search: "",
  offset: 0,
  sortOrder: SORT_ORDER.DESC,
  sortBy: "mcc"
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
  padding: 2rem 1rem 2rem 3rem;
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

  useEffect(() => {
    setFilter({...filter, sortOrder: SORT_ORDER.DESC});
  }, [filter.sortBy]);

  const handleSorting = (sortOrder: SORT_ORDER, field: string) => {
    setFilter({...filter, sortOrder, sortBy: field});
  };

  const sortingProps = {
    handleSorting,
    sortBy: filter?.sortBy,
    sortOrder: filter?.sortOrder
  };

  const header = (
    <Header>
      <img src="/resources/img/header-image.jpg" alt="header" />
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
          IMSI-ranges.com is your solution to resolve an IMSI (integrated mobile subscriber identity) to a Mobile Network operator.
          <dl>
            <dt>How it works:</dt>
            <dd>-	Mobile Country Codes (MCC) are used in wireless telephony networks (GSM, UMTS, CDMA etc.) to properly identify and associate a mobile subscriber to a country of origin.</dd>
            <dd>-	Mobile Network Codes (MNC) are used in wireless telephony networks (GSM, UMTS, CDMA etc.) to properly identify and associate a mobile subscriber to a home network.</dd>
          </dl>
          The combination of the 2 above mentioned information in one string (MCC directly followed by the MNC) results in the so called Home Network Identity (HNI). (Example: MCC of 262 and MCN of 02 results in an HNI of 26202 = Vodafone Germany). In order to completely identify a specific subscriber, the HNI is combined with the MSIN (Mobile Subscriber Identification Number) and produces the so called IMSI (Integrated Mobile Subscriber Identity). In the table below you can search the complete global IMSI Range for free in order to identify any MCC, MNC or HNI of the world.
        </Body>
      </Box>
      <br/>
      <Box paddingBottom={50}>
        <Body lineHeight={30}>
          <Text color="#fd9b1e">www.imsi-ranges.com&nbsp;</Text>
          is provided to you by
          <Text color="#fd9b1e">&nbsp;www.anymessage.cloud&nbsp;</Text>
          your cloud communication provider!
        </Body>
      </Box>
    </Box>
  );

  const tableHead = (
    <TableHead>
      <TableRow>
        <TableCell width="10%" field="mcc" {...sortingProps}>
          MCC
        </TableCell>
        <TableCell width="10%" field="mnc" {...sortingProps}>
          MNC
        </TableCell>
        <TableCell width="10%" field="country.iso" {...sortingProps}>
          ISO
        </TableCell>
        <TableCell width="15%" field="country.name" {...sortingProps}>
          Country
        </TableCell>
        <TableCell width="10%" field="country.countryCode" {...sortingProps}>
          Country Code
        </TableCell>
        <TableCell width="45%" field="name" {...sortingProps}>
          Network
        </TableCell>
      </TableRow>
    </TableHead>
  );

  const tableBody = (
    <TableBody>
      {data !== undefined && data.map((rowData: any, index: number) => (
        <TableRow key={index} height="55">
          <TableCell width="10%">{rowData.mcc ? rowData.mcc : 0}</TableCell>
          <TableCell width="10%">{rowData.mnc ? rowData.mnc : 0}</TableCell>
          <TableCell width="10%">{(rowData.country && rowData.country.iso) ? rowData.country.iso : ""}</TableCell>
          <TableCell width="15%">{(rowData.country && rowData.country.name) ? rowData.country.name : ""}</TableCell>
          <TableCell width="10%">{(rowData.country && rowData.country.countryCode) ? rowData.country.countryCode: ""}</TableCell>
          <TableCell width="45%">{rowData.name ? rowData.name : ""}</TableCell>
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
      <Box flex flexDirection="column" align="center" marginRight={10}>
        <img src="/resources/img/logo.png" width="auto" height={60} style={{ marginBottom: 4 }} alt="footer" />
      </Box>
      <Box align="right">
        <Text color="#999999" size={12}>
          mcc-mnc.com | @ 2011-2013 by&nbsp;
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
