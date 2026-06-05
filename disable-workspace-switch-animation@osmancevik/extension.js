import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as WorkspaceAnimation from 'resource:///org/gnome/shell/ui/workspaceAnimation.js';

export default class InstantWorkspaceSwitcherExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._originalAnimateSwitch = null;
    }

    enable() {
        if (!this._originalAnimateSwitch) {
            this._originalAnimateSwitch = WorkspaceAnimation.WorkspaceAnimationController.prototype.animateSwitch;
        }

        WorkspaceAnimation.WorkspaceAnimationController.prototype.animateSwitch = function (
            _from,
            _to,
            _direction,
            onComplete
        ) {
            onComplete();
        };
    }

    disable() {
        if (this._originalAnimateSwitch) {
            WorkspaceAnimation.WorkspaceAnimationController.prototype.animateSwitch = this._originalAnimateSwitch;
            this._originalAnimateSwitch = null;
        }
    }
}
