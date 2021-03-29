import React from "react";
import styled from "styled-components";
import Text from "./Text";

interface EmptyStateParams {
  icon?: string;
  title: string;
  actions?: any;
}

const ContentState = styled.div`
  width: 100%;
  height: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyState = ({ title, actions }: EmptyStateParams) => {
  return (
    <ContentState>
      <Text>{title}</Text>
      {actions}
    </ContentState>
  );
};

export default EmptyState;