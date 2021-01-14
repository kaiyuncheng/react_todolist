const Footer = ({ numOfRemaining, handleDeleteDone, handleDeleteAll }) => {
  return (
    <footer>
      <p>剩餘項目: {numOfRemaining}</p>
      <button className="btn-reset btn-delete" onClick={handleDeleteDone}>
        清除已完成
      </button>
      <button className="btn-reset btn-delete" onClick={handleDeleteAll}>
        刪除全部
      </button>
    </footer>
  );
};

export default Footer;
