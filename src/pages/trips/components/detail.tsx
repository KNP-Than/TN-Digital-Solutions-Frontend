import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TtripsDto } from "../../../types/trips";
import TripsService from "../../../api/trips.service";
import { loadingAppConfig } from "../../../configs/app-config";
import axios, { Axios } from "axios";
import { Spin } from "antd";

export const TripsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const baseUrlService = axios.create({
    baseURL: loadingAppConfig().REACT_APP_API_BASE_URL_SERVICE,
  });
  const [dataSource, setDataSource] = useState<TtripsDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading]);

  const fetchData = async () => {
    if (!id) {
      throw new Error("ID parameter is missing");
    }
    const resTrip = await TripsService(baseUrlService).findById(id);
    const tripObj = resTrip.length > 0 ? resTrip[0] : null;
    setDataSource(tripObj);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : dataSource ? (
        <div className="max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden h-full">
              <img
                src={dataSource.photos[0]}
                alt="Main Image"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-left">
                <Link to={`/detail/${dataSource.eid}`}>{dataSource.title}</Link>
              </h1>
              <p className="mt-4 text-gray-700 text-left">
                {dataSource.description} ...
                <a href="#" className="text-blue-500 underline">
                  อ่านต่อ
                </a>
              </p>
              <div className="mt-4 text-sm text-gray-500 text-left">
                หมวด:{" "}
                {dataSource.tags.map((tag: string, index: number) => (
                  <a href="#" className="text-gray-500 underline pl-1">
                    {index === dataSource.tags.length - 1 ? "และ " : ""}
                    {tag}
                  </a>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {dataSource.photos.map((photo: string, index: number) => {
                  if (index > 0) {
                    return (
                      <img
                        src={photo}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>ไม่พบข้อมูล</>
      )}
    </>
  );
};
