import  MainLayout from "@/layouts/MainLayout";
import AllBooks from "@/pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";

import {
  createBrowserRouter,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path:'/',
            element: <AllBooks></AllBooks>
        },
        {
          path: '/borrow-summary',
          element: <BorrowSummary></BorrowSummary>
        }
    ]
  },
]);

export default router;