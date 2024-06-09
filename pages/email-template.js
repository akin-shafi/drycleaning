import React from "react";

function EmailTemplate() {
	const user = {
		name: "Shafi Akinropo",
	};
	return (
		<>
			<div style="font-family: Arial, sans-serif;border: 1px solid #ddd;background-color: #f0f3f7;">
                            <div
                                style="
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        background-color: #fff;
                    ">
                                <div style="text-align: center; margin-bottom: 20px">
                                    <img
                                        src="https://master.d1wpsg5az1cdfp.amplifyapp.com/images/logo.png"
                                        alt="Company Logo"
                                        style="max-width: 150px"
                                    />
                                </div>
                                <div style="padding: 20px">
                                    <h1 style="font-size: 24px; color: #333">Password Reset Request</h1>
                                    <p style="font-size: 16px; color: #333">Hello ${user.name},</p>
                                    <p style="font-size: 16px; color: #333">
                                        We received a request to reset your password. Click the link below
                                        to reset your password:
                                    </p>
                                    <a
                                        href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}"
                                        style="
                                display: inline-block;
                                margin: 20px 0;
                                padding: 10px 20px;
                                font-size: 16px;
                                color: #ffffff;
                                background-color: #000;
                                text-decoration: none;
                                border-radius: 5px;
                            ">
                                        Reset Password
                                    </a>
                                    <p style="font-size: 16px; color: #333">
                                        If you did not request this, please ignore this email and your
                                        password will remain unchanged.
                                    </p>
                                    <p style="font-size: 16px; color: #333">Best regards,</p>
                                    <p style="font-size: 16px; color: #333">The Company Team</p>
                                </div>
                                <div
                                    style="
                            text-align: center;
                            margin-top: 20px;
                            border-top: 1px solid #ddd;
                            padding-top: 10px;
                        ">
                                    <p style="font-size: 12px; color: #777">
                                        &copy; ${new Date().getFullYear()} Company. All rights reserved.
                                    </p>
                                    <p style="font-size: 12px; color: #777">
                                        1234 Street, City, Country
                                    </p>
                                    <p style="font-size: 12px; color: #777">
                                        If you have any questions, contact us at{" "}
                                        <a
                                            href="mailto:support@example.com"
                                            style="color: #007bff; text-decoration: none">
                                            support@example.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
		</>
	);
}

export default EmailTemplate;
