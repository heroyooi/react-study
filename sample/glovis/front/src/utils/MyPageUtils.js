export function getFreeTicketHtml(val, day) {
    return (
        <div className="float-wrap mt4">
            <span>
            <em>{val}</em>대 이용 중
            </span>
            <span className="date">{`D-${day}`}</span>
        </div>
    );
}

export function getOneTimeTicketHtml(val) {
    return (
        <div className="voucher-area">
            <div>
                <p>대당이용권</p>
            </div>
            <div className="mt4">
                <span>
                <em>{val}</em>대 이용 중
                </span>
            </div>
        </div>
    );
}


export function getUpdateFreeTicketHtml(val, total, day) {
    return (
        <div className="float-wrap mt4">
            <span>
            <em>{val}</em>대 이용 중 ({val}/{total})
            </span>
            <span className="date">D-{day} 자동결제중</span>
        </div>
    );
}


export function getUpdateOneTimeTicketHtml(val) {
    return (
        <div className="voucher-area">
        <div>
            <p>업데이트 대당권</p>
        </div>
        <div className="mt4">
            <span>
            <em>{val}</em>대 이용 중
            </span>
        </div>
        </div>
    );
}