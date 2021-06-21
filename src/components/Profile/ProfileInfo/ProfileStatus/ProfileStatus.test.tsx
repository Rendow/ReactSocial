import React from "react";
import {ProfileStatus} from "./ProfileStatus";
import {create} from "react-test-renderer";
import {updateStatus} from "../../../../redux/propfile-reducer";



describe('ProfileStatus component',() => {
    test('status from props should be in the state',() => {
        const component = create(<ProfileStatus status={'new one'} updateStatus={updateStatus}/>);

        // root - возвращает эксземпляр обьекта (компонента)
        const root = component.root
        expect(root?.instance.state.status).toBe('new one')
    })
    test('after creation span should be exist',() => {
        const component = create(<ProfileStatus status={'new one'} updateStatus={updateStatus}/>);

        const root = component.root
        const span = root.findAllByType('span')
        expect(span.length).toBe(1)
    })
})