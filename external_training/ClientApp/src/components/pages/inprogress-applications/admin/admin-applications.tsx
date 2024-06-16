import {AdminPendingApplications} from "./admin-pending-applications.tsx";

export function AdminApplications() {
    // const [historyMode, setHistoryMode] = useState(() => false);

    return (
      <div className='ml-[96px]'>
        <div className={"mt-[40px] font-medium flex-grow-1"}>
          {/*<ModeSwitchButton*/}
          {/*  className={"mx-[55px]"}*/}
          {/*  contentMode={historyMode}*/}
          {/*  setContentMode={setHistoryMode}*/}
          {/*  leftPartText={"Заявки в работе"}*/}
          {/*  rightPartText={"История"}/>*/}
            <AdminPendingApplications />
        </div>
      </div>

    )
}