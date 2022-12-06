import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { Checkbox } from './Checkbox';
import { RiArrowUpDownFill } from "react-icons/ri";

export const Table = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps
  } = useTable({
    columns,
    data
  },
  useSortBy)

  return (
    <>
      <div className='check'>
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns.map(column => (
          <div key={column.name}> <img src="./profile.jpg" alt="" srcset="" />
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                <span>
                <RiArrowUpDownFill/>
                    {column.isSorted}
                  </span></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td  {...cell.getCellProps()}>
                    {cell.render('Cell')} </td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}