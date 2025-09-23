import { useState } from "react";
export default function CustomSMS() {
    const [number, setNumber] = useState("");
    const [sms, setSms] = useState("");
    const [activeTable, setActiveTable] = useState(null);
    return (
        <div className="container-fluid mt-0 p-0" style={{ paddingRight: "1%" }}>
            <div className="card shadow-lg border-0 rounded-3 w-100">
                <div
                    className="card-header text-white d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "rgba(243,156,18,255)" }}
                >
                    <h5 className="mb-1 text-white">General SMS</h5>
                </div>

                <div className="card-body">
                    <p className=" text-danger" style={{ fontSize: "25px", }}>
                        Type the text bellow and send, this message will be send on whole the number's list in custom numbers database for the marketing purpose.
                    </p>
                    <hr />

                    {/* SMS Input */}
                    <div className="mb-3 w-25">
                        <label className="form-label">Text</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter SMS"
                            rows={4}
                            value={sms}
                            onChange={(e) => setSms(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button aligned bottom-right */}
                    <div className="d-flex ">
                        <button type="submit" className="btn btn-success w-auto">
                            SEND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
