function RequestCard(props: any) {
    const { data, index } = props;


    let style1 = `flex flex-col gap-y-1`;
    let style2 = `text-primary capitalize p-1 font-[600] text-[12px]`;
    let style3 = `text-dark capitalize p-1 font-[400] text-[14px]`;
    const keys = Object.keys(data);
    return (
        <div className="bg-white py-4 px-6">
            <div className="my-2 flex items-center p-1">
                <span className={`text-primary text-[14px] font-[700] pr-1`}>{`Node ${index+1} :`}</span>
                <span className={`text-dark capitalize text-[14px] font-[700]`}>{data.name}</span>
            </div>
            <div className="data_card grid grid-cols-3 gap-y-2">
                {keys.map((key: any) => {
                    return <div className={style1}>
                        <span className={style2}>{key.split(`_`).join(" ")}</span>
                        <span className={style3}>{data[key]}</span>
                    </div>
                })}
            </div>
        </div>
    )
};

export default RequestCard;