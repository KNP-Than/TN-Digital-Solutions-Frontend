import React, { useEffect, useState } from "react";
import { Card, Input, Image, Spin, Form, Button } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TtripsDto } from "../../types/trips";
import axios from "axios";
import { loadingAppConfig } from "../../configs/app-config";
import TripsService from "../../api/trips.service";
import { useForm } from "antd/es/form/Form";

export const IndexTrips: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const [form] = useForm();
  const baseUrlService = axios.create({
    baseURL: loadingAppConfig().REACT_APP_API_BASE_URL_SERVICE,
  });
  const [dataSource, setDataSource] = useState<TtripsDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading]);

  const fetchData = async () => {
    const resTrip = await TripsService(baseUrlService).findAll();
    setDataSource(resTrip);
    setLoading(false);
  };

  const onClickTag = async (value: string) => {
    if (value) {
      form.setFieldValue(`search`, value);
      const resTrip = await TripsService(baseUrlService).findByTag(value);
      setDataSource(resTrip);
      navigate(`/${value}`);
    }
  };

  const onValuesChange = async (value: { search: string }) => {
    navigate(`/${value.search}`);
    const resTrip = await TripsService(baseUrlService).findAll(value.search);
    setDataSource(resTrip);
  };

  return (
    <div className="App">
      <div className=" flex justify-center">
        <div>
          <div
            style={{ color: "#00BFFF", paddingTop: 60 }}
            className=" text-4xl font-semibold mb-4"
          >
            เที่ยวไหนดี
          </div>

          {loading ? (
            <Spin />
          ) : (
            <>
              <div>
                <Form form={form} onValuesChange={onValuesChange}>
                  <Form.Item name={"search"}>
                    <Input
                      placeholder="หาที่เที่ยวแล้วไปกัน..."
                      className="text-center rounded-t-lg w-full border-t-0 border-x-0 border-b-2 border-slate-300 focus:ring-0 focus:border-blue-400"
                    />
                  </Form.Item>
                </Form>
              </div>
              <div>
                {dataSource.map((item: TtripsDto) => (
                  <React.Fragment key={item.eid}>
                    <div className="max-w-4xl mx-auto p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="rounded-lg overflow-hidden h-full">
                          <img
                            src={item.photos[0]}
                            alt="Main Image"
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h1 className="text-2xl font-bold text-left">
                            <Link to={`/detail/${item.eid}`}>{item.title}</Link>
                          </h1>
                          <p className="mt-4 text-gray-700 text-left">
                            {item.description} ...
                            <Link
                              to={`/detail/${item.eid}`}
                              className="text-blue-500 underline"
                            >
                              อ่านต่อ
                            </Link>
                          </p>
                          <div className="mt-4 text-sm text-gray-500 text-left">
                            หมวด:{" "}
                            {item.tags.map((tag: string, index: number) => (
                              <Button
                                size="small"
                                type="link"
                                className="text-gray-500 underline pl-1"
                                onClick={() => onClickTag(tag)}
                              >
                                {index === item.tags.length - 1 ? "และ " : ""}
                                {tag}
                              </Button>
                            ))}
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-6 hidden sm:grid">
                            {item.photos.map((photo: string, index: number) => {
                              if (index > 0) {
                                return (
                                  <img
                                    key={index}
                                    src={photo}
                                    alt={`${photo}`}
                                    className="w-full h-auto object-cover rounded-lg shadow-md"
                                  />
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
