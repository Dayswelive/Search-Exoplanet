const Table = ({ planets }) => {
  return (
    <>
      {planets.length ? (
        <div>
          <table
            border={1}
            style={{ marginLeft: "auto", marginRight: "auto", width: "80%" }}
          >
            <thead>
              <tr style={{ color: "white", fontSize: "large" }}>
                <td>Planet Name</td>
                <td>Host Name</td>
                <td>Discovery Method</td>
                <td>Discovery Year</td>
                <td>Discovery Facility</td>
              </tr>
            </thead>
            <tbody>
              {planets?.map((planet, index) => {
                return (
                  <tr key={index} style={{ color: "white" }}>
                    <td style={{ margin: "0 10px" }}>{planet?.pl_name}</td>
                    <td style={{ margin: "0 10px" }}>{planet?.hostname}</td>
                    <td style={{ margin: "0 10px" }}>
                      {planet?.discoverymethod}
                    </td>
                    <td style={{ margin: "0 10px" }}>{planet?.disc_year}</td>
                    <td style={{ margin: "0 10px" }}>
                      {planet?.disc_facility}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{ color: "white", marginLeft: "600px", fontSize: "x-large" }}
        >
          No data to show
        </div>
      )}
    </>
  );
};

export default Table;
