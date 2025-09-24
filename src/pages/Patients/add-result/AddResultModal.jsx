export default function AddResultMudal() {
    return (
        <>
            <form>
                <div className="mb-3">
                    <label className="form-label">Result Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea className="form-control"></textarea>
                </div>
            </form>
        </>
    );
}
