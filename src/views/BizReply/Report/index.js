/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// material-ui
import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';

// import useAuth from 'hooks/useAuth';
// // import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReportBreadcrumb from 'ui-component/Report/ReportBreadcrumb';
import ViewReports from './viewReports/ViewReports';
import NewReport from './addNewReport/NewReport';
import { useState } from 'react';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css';

const Report = () => {
    const { projects = [], project } = useSelector((s) => s.project);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const demoProjects = [
        {
          id: "66ef4dda7f5ad18f2f679313",
          userId: "66b9f01f5ac596862fe1a5ad",
          workspaceId: "66b9f0205ac596862fe1a5b3",
          projectName: "Apploye",
          projectDescription: "Time tracker tools.",
          clientLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959016/bvz3rmoda6rw35ccsgnx.png",
          domain: "https://app.apploye.com",
          dateRange: {
            from: "2024-09-21T22:50:03.763Z",
            to: "2024-09-21T22:50:03.763Z"
          },
          platforms: ["reddit.com", 'quora.com', 'twitter.com', 'linkedin.com', 'tiktok.com', 'facebook.com', 'instagram.com', 'pinterest.com'],
          keywords: [
            "66ef25f22f5309a5e0ee2b7a",
            "66ef25f22f5309a5e0ee2b7b",
            "66ef25f22f5309a5e0ee2b7c"
          ],
          agencyLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959021/z0t1okvffn2wloqbs3ut.jpg",
          status: "processing",
          createdAt: "2024-09-21T22:51:06.323Z",
          updatedAt: "2024-09-21T22:51:06.323Z"
        },
        {
          id: "76ef4dda7f5ad18f2f679314",
          userId: "76b9f01f5ac596862fe1a5ae",
          workspaceId: "76b9f0205ac596862fe1a5b4",
          projectName: "Task Tracker",
          projectDescription: "Manage your tasks efficiently.oost your productivity with our tools.oost your productivity with our tools..",
          clientLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959016/xyz3rmoda6rw35ccsgnx.png",
          domain: "https://app.tasktracker.com",
          dateRange: {
            from: "2024-09-20T22:50:03.763Z",
            to: "2024-09-20T22:50:03.763Z"
          },
          platforms: ["twitter.com"],
          keywords: [
            "76ef25f22f5309a5e0ee2b7d",
            "76ef25f22f5309a5e0ee2b7e",
            "76ef25f22f5309a5e0ee2b7f"
          ],
          agencyLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959021/abc1okvffn2wloqbs3ut.jpg",
          status: "completed",
          createdAt: "2024-09-20T22:51:06.323Z",
          updatedAt: "2024-09-20T22:51:06.323Z"
        },
        {
          id: "86ef4dda7f5ad18f2f679315",
          userId: "86b9f01f5ac596862fe1a5af",
          workspaceId: "86b9f0205ac596862fe1a5b5",
          projectName: "Time Logger",
          projectDescription: "Log your time effectively.",
          clientLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959016/abc3rmoda6rw35ccsgnx.png",
          domain: "https://app.timelogger.com",
          dateRange: {
            from: "2024-09-19T22:50:03.763Z",
            to: "2024-09-19T22:50:03.763Z"
          },
          platforms: ["linkedin.com"],
          keywords: [
            "86ef25f22f5309a5e0ee2b80",
            "86ef25f22f5309a5e0ee2b81",
            "86ef25f22f5309a5e0ee2b82"
          ],
          agencyLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959021/def2okvffn2wloqbs3ut.jpg",
          status: "in progress",
          createdAt: "2024-09-19T22:51:06.323Z",
          updatedAt: "2024-09-19T22:51:06.323Z"
        },
        {
          id: "96ef4dda7f5ad18f2f679316",
          userId: "96b9f01f5ac596862fe1a5ag",
          workspaceId: "96b9f0205ac596862fe1a5b6",
          projectName: "Productivity Booster",
          projectDescription: "Boost your productivity with our tools.",
          clientLogo: "https://res.cloudinary.com/drf7cking/image/upload/v1726959016/uvw3rmoda6rw35ccsgnx.png",
          domain: "https://app.productivitybooster.com",
          dateRange: {
            from: "2024-09-18T22:50:03.763Z",
            to: "2024-09-18T22:50:03.763Z"
          },
          platforms:["facebook.com"],
          keywords:[
            "96ef25f22f5309a5e0ee2b83", 
            "96ef25f22f5309a5e0ee2b84", 
            "96ef25f22f5309a5e0ee2b85"
           ],
           agencyLogo:"https://res.cloudinary.com/drf7cking/image/upload/v1726959021/ghi3okvffn2wloqbs3ut.jpg", 
           status:"pending", 
           createdAt:"2024-09-18T22:51;06.323Z", 
           updatedAt:"2024-09-18T22;51;06.323Z" 
        }
      ];
    // const navigate = useNavigate();
    // const { dbUser } = useAuth();
    // const { subscription } = useSelector((state) => state.subscription);

    // const remainingCredit = subscription?.remainingCredit;

    // const handleClick = () => {
    //     navigate('/subscription');
    // };
    // const selectionRange = {
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     key: 'selection'
    // };
    // const handleSelect = (ranges) => {
    //     console.log(ranges);
    //     // {
    //     //   selection: {
    //     //     startDate: [native Date Object],
    //     //     endDate: [native Date Object],
    //     //   }
    //     // }
    // };
    return (
        <>
            <ReportBreadcrumb setShowCreateModal={setShowCreateModal} />
            <Card>
                <Box sx={{ minHeight: '100%' }}>
                    <NewReport {...{ projects, project, showCreateModal, setShowCreateModal }} />
                </Box>
            </Card>
            <ViewReports projects={demoProjects} />
        </>
    );
};

export default Report;
