import { useCallback, useMemo, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import {
  Table,
  Card,
  Switch,
  Select,
  Form,
  Button,
  Input,
  Row,
  Col,
} from "antd";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { dataAction } from "action";
const { Option } = Select;
const columns = [
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Store",
    dataIndex: "store",
    key: "store",
  },
  {
    title: "Returned",
    dataIndex: "returned",
    key: "returned",
    render: ({ returned, record }: { returned: boolean; record: any }) => (
      <div>
        <Switch defaultChecked={returned} />
      </div>
    ),
  },
];

interface TableProps {
  id: string | number;
  country: string;
  value: number;
  store: string;
  returned: boolean;
}

interface ValueOptions {
  [key: string]: any;
}

const Home = () => {
  // redux
  const reducers = useSelector((state: RootState) => state.dataReducers);
  const dispatch = useDispatch();

  // state
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<ValueOptions>({
    country: "",
    store: "",
  });

  // search
  const onSubmitSearch = async ({ data }: { data: ValueOptions }) => {
    const { data: result } = data;

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSearchItem(result);
    console.log(result);
  };

  // fetch data
  const fetchData = useCallback(async () => {
    await axios
      .get(`http://www.mocky.io/v2/5d4caeb23100000a02a95477`)
      .then((resp) => {
        if (resp.status === 200) {
          const { data } = resp;
          dispatch(dataAction.fetchInitialData({ field: "dataTest", data }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useMemo(() => {
    fetchData();
  }, [fetchData]);

  const actionItems = useMemo(() => {
    let items = reducers.dataTest.filter(
      (x: TableProps) => x.returned === false
    );

    if (searchItem?.country || searchItem.store) {
      items = items.filter(
        (x: TableProps) =>
          x.country === searchItem.country || x.store === searchItem.store
      );
    }
    console.log(items);

    return items;
  }, [reducers.dataTest, searchItem]);

  return (
    <div className='container'>
      <Card title='Store List'>
        <FormSearch
          searchItem={searchItem}
          onSubmitSearch={(data: any) => onSubmitSearch({ data })}
        />
        <Table dataSource={actionItems} columns={columns} />
      </Card>
    </div>
  );
};

const FormSearch = ({
  searchItem,
  onSubmitSearch,
}: {
  searchItem: ValueOptions;
  onSubmitSearch: (x: any) => Promise<any> | void;
}) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onSubmit = async ({ data }: ValueOptions) => {
    setIsSearching(true);
    await onSubmitSearch({ data });
    setIsSearching(false);
  };

  return (
    <div>
      <Form name='control-ref' onFinish={(data: any) => onSubmit({ data })}>
        <Row gutter={16}>
          <Col className='gutter-row' span={6}>
            <Form.Item name='country' label='Country'>
              <Select defaultValue='' style={{ width: 120 }}>
                <Option value='NZL'>NZL</Option>
                <Option value='AUS'>AUS</Option>
                <Option value='USA'>USA</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={6}>
            <Form.Item name='store' label='Store'>
              <Input />
            </Form.Item>
          </Col>
          <Col className='gutter-row' span={6}>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Home;
