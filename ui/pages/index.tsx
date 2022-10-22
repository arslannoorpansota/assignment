import Axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/router'

import DashboardLayout from "../layouts/DashboardLayout";
import LinkTo from "../components/LinkTo";
import CompactLayout from "../layouts/CompactLayout";
import ErrorMessage from "../components/ErrorMessage";
import { Form, FormField, FormInputFuncProps } from "../components/form";
import Button from "../components/Button";


export default function Home() {
  const [apiError, setApiError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const onSubmit = async (value: Record<string, any>) => {
    setApiError('');

    setLoading(true);
    const { name, email, cell, age } = value;

    Axios.post('/api/users/', { name, email, cell, age })
      .then((response) => {
        if (!response.data.error){
          router.push('/view-users');
        }
        else{
          setApiError(response.data.error)
        }
      })
      .catch((e) => {
        setApiError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DashboardLayout>
      <CompactLayout title="Add User">

        <Form onSubmit={onSubmit} className="space-y-4">

          {apiError && <ErrorMessage error={apiError} />}

          <FormField name="name" type="text" label={"Name"} required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="Name" type="text" autoComplete="name" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>

          <FormField name="email" type="email" label={"Email"} required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="email" type="email" autoComplete="email" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>

          <FormField name="cell" type="text" label={'Cell#'} required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="cell" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="cell" type="text" autoComplete="current-cell" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>

          <FormField name="age" type="number" label={"Age"} min={18} max={60} required>
            {({ errors, label, ...props }: FormInputFuncProps) => (
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id="age" type="number" autoComplete="current-password" {...props}
                  className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
              </div>
            )}
          </FormField>

          <div className="flex items-center text-sm space-x-1">
            <span>Wanna see existing users?</span>
            <LinkTo href="/view-users" className="font-medium text-indigo-600 hover:text-indigo-700">
              View Users
            </LinkTo>
          </div>

          <div className="pt-2">
            <Button className="w-full" loading={loading} type="submit">Submit</Button>
          </div>
        </Form>
      </CompactLayout>
    </DashboardLayout>
  );
}