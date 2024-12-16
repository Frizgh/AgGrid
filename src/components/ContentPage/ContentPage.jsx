import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import style from './Contetpage.module.css'
import { Button } from 'antd'

ModuleRegistry.registerModules([AllCommunityModule])

export const Content = () => {
  const navigate = useNavigate()
  const logout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  const [rowDefs, setRowDefs] = useState([])
  const [colDefs, setColDefs] = useState([])
  useEffect(() => {
    const parameters = JSON.parse(localStorage.getItem('parameters'))
    if (parameters) {
      setColDefs(parameters.col)
      setRowDefs(parameters.row)
    }
  }, [])

  const pagination = true
  const paginationPageSize = 10
  const paginationPageSizeSelector = [10, 50, 100]

  const gridOptions = {
    rowData: rowDefs,
    columnDefs: colDefs,
    pagination: pagination,
    paginationPageSize: paginationPageSize,
    paginationPageSizeSelector: paginationPageSizeSelector,
    defaultColDef: {
      resizable: true,
      flex: 1,
    },
    onGridReady: (params) => {
      params.api.sizeColumnsToFit()
    },
    onGridSizeChanged: (params) => {
      params.api.sizeColumnsToFit()
    },
  }

  return (
    <div className={style.content}>
      <div className={style.contentHead}>
        <Link to="/settings">Вернуться в настройки</Link>
        <Button type="primary" onClick={logout}>
          Log out
        </Button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
        <AgGridReact rowData={rowDefs} columnDefs={colDefs} {...gridOptions} />
      </div>
    </div>
  )
}
