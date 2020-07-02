module.exports = [
    {
        name: 'client-review-request',
        icon: 'risk',
        title: 'task.client-review-request.title',
        appliesTo: 'reports',
        appliesToType: ['no_contact', 'referral_for_care'],
        appliesIf: (contact, report) => {
            return report.form === 'referral_for_care' ||
                report.form === 'no_contact' && Utils.getField(report, 'n.client_ok') !== 'yes';
        },
        resolvedIf: (contact, report, event, dueDate) => {
            return Utils.isFormSubmittedInWindow(
                contact.reports,
                'client_review',
                Utils.addDate(dueDate, -event.start).getTime(),
                Utils.addDate(dueDate, event.end + 1).getTime()
            );
        },
        actions: [{
            form: 'client_review',
            label: 'Client review',
            modifyContent: function (content, contact, report) {
                if (report.form === 'no_contact') {
                    content.is_no_contact_ctx = true;
                }
                else {
                    content.is_referral_for_care_ctx = true;
                }
            }
        }],
        events: [{
            days: 0,
            start: 1,
            end: 365
        }]
    }
];
