// @flow
import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import {mountWithTheme} from "../../utils/test";
import Pagination from "../Pagination";

describe("Pagination", () => {
    it("render", () => {
        const onChangePage = jest.fn();
        const wrapper = mountWithTheme(<Pagination count={10} onChangePage={onChangePage} page={2} rowsPerPage={2} />);

        wrapper.find(IconButton).forEach((icon) => {
            expect(icon.prop("disabled")).toBeFalsy();
        });

        wrapper.unmount();
    });

    [["first page", 0], ["prev page", 1], ["next page", 3], ["last page", 4]].forEach(([name, page], index) => {
        it(name, () => {
            const onChangePage = jest.fn();
            const wrapper = mountWithTheme(
                <Pagination count={10} onChangePage={onChangePage} page={2} rowsPerPage={2} />,
            );

            wrapper
                .find(IconButton)
                .at(index)
                .simulate("click");

            expect(onChangePage).toHaveBeenCalledWith(page);

            wrapper.unmount();
        });
    });
});
