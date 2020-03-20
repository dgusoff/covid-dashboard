import * as React from "react";

export interface ITestComponent2Props {

}

export class TestComponent2 extends React.Component<ITestComponent2Props, {}> {

    public render(): React.ReactElement<ITestComponent2Props> {
        return (
           <div>this is test component 2</div>
        )
    }
}