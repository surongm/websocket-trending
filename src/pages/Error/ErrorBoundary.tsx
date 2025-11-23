import React from "react";

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback?: any },
    { hasError: boolean; error: any }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    reset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            const Fallback = this.props.fallback;
            return <Fallback error={this.state.error} reset={this.reset} />;
        }
        return this.props.children;
    }
}
