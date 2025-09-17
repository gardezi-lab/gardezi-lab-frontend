import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="footer position-fixed">
                <div className="row g-0 justify-content-between align-items-center h-100">
                    <div className="col-12 col-sm-auto text-center">
                        <p className="mb-0 mt-2 mt-sm-0 text-body">
                            Copyright © 2014-2023 GARDEZI LAB. All rights reserved.
                            <span className="d-none d-sm-inline-block" />
                            {/* <span className="d-none d-sm-inline-block mx-1">|</span>
                            <br className="d-sm-none" />
                            2024 ©
                            <a className="mx-1" href="/">
                                Themewagon
                            </a> */}
                        </p>
                    </div>
                    {/* <div className="col-12 col-sm-auto text-center">
                        <p className="mb-0 text-body-tertiary text-opacity-85">v1.18.0</p>
                    </div> */}
                </div>
            </footer>


        </>
    )
}
