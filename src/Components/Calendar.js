import React, { Component } from "react";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstDate: "",
            secondDate: "",
        };
    }

    handleFirstDateChange = (event) => {
        this.setState({ firstDate: event.target.value });
    };

    handleSecondDateChange = (event) => {
        this.setState({ secondDate: event.target.value });
    };

    getWeekday = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString + "T00:00:00");
        return date.toLocaleDateString("en-US", { weekday: "long" });
    };

    getDaysUntilEndOfYear = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString + "T00:00:00");
        const endOfYear = new Date(date.getFullYear(), 11, 31);
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil((endOfYear - date) / msPerDay);
    };

    getDaysBetweenDates = () => {
        const { firstDate, secondDate } = this.state;
        if (!firstDate || !secondDate) return null;

        const dateA = new Date(firstDate + "T00:00:00");
        const dateB = new Date(secondDate + "T00:00:00");
        const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
        const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
        const msPerDay = 1000 * 60 * 60 * 24;

        return Math.abs(Math.round((utcB - utcA) / msPerDay));
    };

    render() {
        const { firstDate, secondDate } = this.state;
        const firstWeekday = this.getWeekday(firstDate);
        const secondWeekday = this.getWeekday(secondDate);
        const daysBetween = this.getDaysBetweenDates();

        return (
            <div className="container my-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Interactive Calendar</h2>
                        <p className="card-text">
                            Select two dates and see the weekdays and days between them.
                        </p>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="firstDate" className="form-label">
                                    Start date
                                </label>
                                <input
                                    id="firstDate"
                                    type="date"
                                    className="form-control"
                                    value={firstDate}
                                    onChange={this.handleFirstDateChange}
                                />
                                {firstWeekday && (
                                    <>
                                        <div className="form-text">
                                            Day: <strong>{firstWeekday}</strong>
                                        </div>
                                        <div className="form-text">
                                            Days until end of year: <strong>{this.getDaysUntilEndOfYear(firstDate)}</strong>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="secondDate" className="form-label">
                                    End date
                                </label>
                                <input
                                    id="secondDate"
                                    type="date"
                                    className="form-control"
                                    value={secondDate}
                                    onChange={this.handleSecondDateChange}
                                />
                                {secondWeekday && (
                                    <>
                                        <div className="form-text">
                                            Day: <strong>{secondWeekday}</strong>
                                        </div>
                                        <div className="form-text">
                                            Days until end of year: <strong>{this.getDaysUntilEndOfYear(secondDate)}</strong>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 alert alert-info">
                            {daysBetween !== null ? (
                                <div>
                                    Days between selected dates: <strong>{daysBetween}</strong>
                                </div>
                            ) : (
                                <span>Please select both dates to see the result.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;