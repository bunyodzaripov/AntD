import React from "react";
import { Table } from "antd";

export default function UniversalTable(props) {
   const { columns, dataSource, rowKey, pagination, handleChange } = props;

   return (
      <Table
         columns={columns}
         dataSource={dataSource}
         rowKey={rowKey}
         pagination={pagination}
         onChange={(pagination) => handleChange(pagination)}
         bordered
      />
   );
}
