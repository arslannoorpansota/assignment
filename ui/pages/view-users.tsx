import c from 'classnames';
import useSwr from 'swr';

import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Users() {
  const {data} = useSwr('/api/users');
  
  const columns = [
    {key: 'id', name: 'id'},
    {key: 'name', name: 'name', render: (row: any) => (<span className="font-medium text-gray-900">{row['name']}</span>)},
    {key: 'email', name: 'email'},
    {key: 'cell', name: 'Cell#'},
    {key: 'age', name: 'age'},
    {key: 'created_at', name: 'created at', render: (row: any) => new Date(row['created_at']).toLocaleString('en-GB', { timeZone: 'UTC' })},
    {key: 'Is_deleted', name: 'Is_deleted', render: (row: any) => row['Is_deleted'].toString()},
  ]


  return (
    <DashboardLayout>
      <PageHeader title="Users" />
      {data ? <DataTable columns={columns} data={data}/> : 'Loading...'}
    </DashboardLayout>
  )
}