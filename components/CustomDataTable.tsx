import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CustomDataTable = ({
  myData,
  header,
  order,
  orderBy,
  pagination,
  rowsPerPage,
  count,
  page,
  total,
  setState = () => {} }: any) => {


  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    let newOrder = isAsc ? "desc" : "asc";
    let orderKey = "order";
    let orderByKey = "orderBy";
    if(!property) return;
    setState({ [orderKey]: newOrder, [orderByKey]: property });
  };

  const columns: any = [];
  header.map((key: any) => {
    let obj: any = {
      name: <b>{key.label}</b>,
      header: <b>{key.label}</b>,
      selector: key.id,
      Cell: null,
      sortable: key.sortable != null ? key.sortable : true,
      headerStyle: (selector: any, id: any) => {
        return { textAlign: key.align };   // removed partial line here
      },
    }
    if (key.id == 'id') {
      obj.width = '3rem'
    }

    if (key.id == 'name' || key.id == 'upline') {
      obj.minWidth = '150px'
    }

    if (key.id == 'email') {
      obj.minWidth = '190px'
    }

    if (key.id == 'photos') {
      obj.width = '25rem'
    }

    if (key.id == 'targetComplete') {
      obj.width = '120px'
    }

    columns.push(obj);
  });

  const handleSort = async (column: any, sortDirection: any) => {
    handleRequestSort(column.selector)
  };

  const handleChangePage = (newPage: any) => {
    let key = "page";
    setState({ [key]: newPage });
  };

  const handleChangeLimit = (rolePerPage: any) => {
    let key = "limit";
    setState({ [key]: rolePerPage });
  };

  return (
    <div>
      <Fragment>
        <DataTable
          // data={data}
          noHeader
          className={'-striped -highlight'}
          data={myData}
          columns={columns}
          onSort={handleSort}
          defaultSortAsc={order === "asc" ? true : false}
          defaultSortFieldId={orderBy}
          sortServer
          pagination={pagination}
          paginationDefaultPage={page}
          paginationPerPage={rowsPerPage}
          paginationTotalRows={total}
          paginationServer
          onChangeRowsPerPage={(currentRowsPerPage: any, currentPage: any) => {
            handleChangePage(currentPage);
            handleChangeLimit(currentRowsPerPage);
          }}
			    onChangePage={handleChangePage}
          striped={true}
        />
      </Fragment>
    </div>
  );
};

export default CustomDataTable;
