import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

function Dashboard() {
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  // matchList 관련 useState
  const [list, setList] = useState([]);
  const [matchType, setMatchType] = useState(50);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  // userInfo api호출 (fetch)
  const getUser = async () => {
    const requestOptions = {
      method: "GET",
    };
    const json = await (await fetch(`/api/userSearch?nickname=${nickname}`, requestOptions)).json();
    setUser(json);
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(user?.userSearchDto?.accessId);
  }, [user]); // user 상태가 변경될 때만 실행

  const accessId = user?.userSearchDto?.accessId;

  // matchList api 호출 (fetch)
  const getMatchList = async (matchType, offset) => {
    const requestOptions = {
      method: "GET",
    };
    if (matchType === 50 || matchType === 40 || matchType === 52) {
      const json = await (
        await fetch(
          `/api/matches?accessId=${accessId}&matchtype=${matchType}&offset=${offset}&limit=${limit}`,
          requestOptions
        )
      ).json();
      setList(json);
    }

    // matchType 에러시 예외처리 구문(미완)
    // else if(matchType === 10){
    //   const json = await (await fetch(`/api/userSearch/호날두`, requestOptions)).json();
    //   setList(json);
    // }
    // else{
    //   console.log("fetch error!");
    // }
  };
  console.log();
  useEffect(() => {
    getMatchList(matchType, offset);
  }, [matchType, offset]);

  const handleLoadMore = () => {
    setOffset(offset + 10); // increase the number of matches to display by 10
  };

  const transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#111111", "#00d25b", "#ffab00"],
      },
    ],
  };

  const transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const toggleProBanner = () => {
    document.querySelector(".proBanner").classList.toggle("hide");
  };
  // render() {
  return (
    <div>
      <div className="proBanner">
        <div>
          {/* <span className="d-flex align-items-center purchase-popup">
              <p>Get tons of UI components, Plugins, multiple layouts, 20+ sample pages, and more!</p>
              <a href="https://www.bootstrapdash.com/product/corona-react/?utm_source=organic&utm_medium=banner&utm_campaign=free-preview" rel="noopener noreferrer" target="_blank" className="btn btn-sm purchase-button ml-auto">Check Pro Version</a>
              <i className="mdi mdi-close bannerClose" onClick={this.toggleProBanner}></i>
            </span> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card corona-gradient-card">
            <div className="card-body py-0 px-0 px-sm-3">
              <div className="row align-items-center">
                <div className="col-4 col-sm-3 col-xl-2">
                  <img
                    src={require("../../assets/images/dashboard/banner.jpg")}
                    className="gradient-corona-img img-fluid"
                    alt="banner"
                  />
                </div>
                <div className="col-5 col-sm-7 col-xl-8 p-0">
                  <h4 className="mb-1 mb-sm-0">
                    LV.{user?.userSearchDto?.level} {user?.userSearchDto?.nickName}
                  </h4>
                  {/* <p className="mb-0 font-weight-normal d-none d-sm-block">Corona admin template now with a new facelift for enhanced legibility and aesthetics!</p> */}
                </div>
                <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                  <button className="btn btn-outline-light btn-rounded get-started-btn">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 티어 표시 (공식)*/}
      <div className="row">
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>공식경기 최고티어</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">공식경기</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 티어 표시 (감독)*/}
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>공식경기 최고티어</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">공식경기</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 티어 표시 (볼타)*/}
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>감독모드 최고티어</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">공식경기</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Revenue</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">공식경기</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Sales</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">감독모드</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
                  </div>
                  <h6 className="text-muted font-weight-normal"> 9.61% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Purchase</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">친선경기</h2>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                  </div>
                  <h6 className="text-muted font-weight-normal">2.27% Since last month</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">경기 리스트(최근 10경기)</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </th>
                      <th> Client Name </th>
                      <th> Order No </th>
                      <th> Product Cost </th>
                      <th> Project </th>
                      <th> Payment Mode </th>
                      <th> Start Date </th>
                      <th> Payment Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <img src={require("../../assets/images/faces/face1.jpg")} alt="face" />
                          <span className="pl-2">Henry Klein</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Dashboard </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-success">Approved</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <img src={require("../../assets/images/faces/face2.jpg")} alt="face" />
                          <span className="pl-2">Estella Bryan</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Website </td>
                      <td> Cash on delivered </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-warning">Pending</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <img src={require("../../assets/images/faces/face5.jpg")} alt="face" />
                          <span className="pl-2">Lucy Abbott</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> App design </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-danger">Rejected</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <img src={require("../../assets/images/faces/face3.jpg")} alt="face" />
                          <span className="pl-2">Peter Gill</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Development </td>
                      <td> Online Payment </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-success">Approved</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                          <img src={require("../../assets/images/faces/face4.jpg")} alt="face" />
                          <span className="pl-2">Sallie Reyes</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Website </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-success">Approved</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">평점왕</h4>
                <p className="text-muted mb-1 small">공식경기 기준</p>
              </div>
              <div className="preview-list">
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face6.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">김민재</h6>
                        <p className="text-muted text-small">5 minutes ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face8.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Luella Mills</h6>
                        <p className="text-muted text-small">10 Minutes Ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face9.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Ethel Kelly</h6>
                        <p className="text-muted text-small">2 Hours Ago</p>
                      </div>
                      <p className="text-muted">Please review the tickets</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face11.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Herman May</h6>
                        <p className="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p className="text-muted">Thanks a lot. It was easy to fix it .</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">득점왕</h4>
                <p className="text-muted mb-1 small">공식경기 기준</p>
              </div>
              <div className="preview-list">
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face6.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">손흥민</h6>
                        <p className="text-muted text-small">5 minutes ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face8.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Luella Mills</h6>
                        <p className="text-muted text-small">10 Minutes Ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face9.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Ethel Kelly</h6>
                        <p className="text-muted text-small">2 Hours Ago</p>
                      </div>
                      <p className="text-muted">Please review the tickets</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face11.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Herman May</h6>
                        <p className="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p className="text-muted">Thanks a lot. It was easy to fix it .</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">도움왕</h4>
                <p className="text-muted mb-1 small">공식경기 기준</p>
              </div>
              <div className="preview-list">
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face6.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">더브라위너</h6>
                        <p className="text-muted text-small">5 minutes ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face8.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Luella Mills</h6>
                        <p className="text-muted text-small">10 Minutes Ago</p>
                      </div>
                      <p className="text-muted">Well, it seems to be working now.</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face9.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Ethel Kelly</h6>
                        <p className="text-muted text-small">2 Hours Ago</p>
                      </div>
                      <p className="text-muted">Please review the tickets</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src={require("../../assets/images/faces/face11.jpg")}
                      alt="face"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Herman May</h6>
                        <p className="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p className="text-muted">Thanks a lot. It was easy to fix it .</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">구단주의 이적시장 거래기록 top 10</h4>
              <div className="row">
                <div className="col-md-5">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-us"></i>
                          </td>
                          <td>리오넬 메시</td>
                          <td className="text-right"> 1500bp </td>
                          <td className="text-right font-weight-medium"> 56.35% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-de"></i>
                          </td>
                          <td>킬리안 음바페</td>
                          <td className="text-right"> 800bp </td>
                          <td className="text-right font-weight-medium"> 33.25% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-au"></i>
                          </td>
                          <td>Australia</td>
                          <td className="text-right"> 760 </td>
                          <td className="text-right font-weight-medium"> 15.45% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-gb"></i>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right"> 450 </td>
                          <td className="text-right font-weight-medium"> 25.00% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-ro"></i>
                          </td>
                          <td>Romania</td>
                          <td className="text-right"> 620 </td>
                          <td className="text-right font-weight-medium"> 10.25% </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-br"></i>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right"> 230 </td>
                          <td className="text-right font-weight-medium"> 75.00% </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-7">
                  <div id="audience-map" className="vector-map"></div>
                  <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent" //change it to ocean blue: #0077be
                    panOnDrag={true}
                    containerClassName="dashboard-vector-map"
                    focusOn={{
                      x: 0.5,
                      y: 0.5,
                      scale: 1,
                      animate: true,
                    }}
                    series={{
                      regions: [
                        {
                          scale: ["#3d3c3c", "#f2f2f2"],
                          normalizeFunction: "polynomial",
                          values: mapData,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
}

export default Dashboard;
