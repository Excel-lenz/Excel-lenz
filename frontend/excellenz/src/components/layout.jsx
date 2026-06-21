import Input from "./inputs";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function Layout({
                                   children,
                                   sidebarOpen,
                                   setSidebarOpen,
                                   salesOpen,
                                   setSalesOpen,
                                   financeOpen,
                                   setFinanceOpen,
                               }) {
    return (
        <div className="layout">

            <Input />
            <Topbar />

            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                salesOpen={salesOpen}
                setSalesOpen={setSalesOpen}
                financeOpen={financeOpen}
                setFinanceOpen={setFinanceOpen}
            />

            <main className="main">
                {children}
            </main>

        </div>
    );
}