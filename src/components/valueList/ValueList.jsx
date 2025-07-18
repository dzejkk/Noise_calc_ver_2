import style from "./valueList.module.css";

export default function ValueList({
  measurements,
  handleInputChange,
  handleAddInputRow,
  handleRemoveInputRow,
}) {
  return (
    <div className={style.listContainer}>
      <h3 className={style.h3}>Enter your Measurements</h3>
      <div className={style.buttonWrapper}>
        <button onClick={handleAddInputRow} className={style.addButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="#000000"
          >
            <path d="M468.5-469H257v-23h211.5v-211.5h23V-492H703v23H491.5v211.5h-23V-469Z" />
          </svg>
        </button>

        <button
          disabled={measurements.length <= 1}
          onClick={handleRemoveInputRow}
          className={style.removeButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="#14110d"
          >
            <path d="M257-469v-23h446v23H257Z" />
          </svg>
        </button>
      </div>
      <hr />
      <div>
        <p className={style.labels}>LAeq [dB]</p>
        <p className={`${style.labels} ${style.labelTwo}`}>In minutes</p>
      </div>
      <ul className={style.flex}>
        {measurements.map((item) => (
          <li key={item.idOfMeasurement}>
            <div className={style.liMiniContainer}>
              <label htmlFor={`${item.idOfMeasurement}-value`}>Value</label>
              <input
                id={`${item.idOfMeasurement}-value`}
                value={item.dbInput}
                onChange={(e) => {
                  handleInputChange(
                    item.idOfMeasurement,
                    "dbInput",
                    e.target.value // parsing !!
                  );
                }}
                type="number"
                name="dbInput"
              />

              <label htmlFor={`${item.idOfMeasurement}-time`}>Time</label>

              <input
                id={`${item.idOfMeasurement}-time`}
                type="number"
                name="expositionTime"
                value={item.expositionTime}
                onChange={(e) => {
                  handleInputChange(
                    item.idOfMeasurement,
                    "expositionTime",
                    e.target.value // parsing !!
                  );
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
