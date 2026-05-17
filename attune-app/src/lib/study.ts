/**
 * Pilotstudie / Study configuration.
 *
 * Owns the localStorage keys for the welcome flow and participant ID, and
 * the Google-Forms pre-fill URL template that the EndOfShowCard hands the
 * user after a complete show.
 *
 * SETUP (after the Apps Script has created the Google Form):
 *  1. Open the form in Google Forms → ⋮ menu → "Vorausgefüllten Link abrufen".
 *  2. Type the literal string __PID__ into the "Teilnehmer-ID" field, then
 *     click "Link abrufen" and copy the generated URL.
 *  3. Paste that URL below as SURVEY_URL_TEMPLATE. The literal __PID__ will
 *     be swapped in for the user's real ID at runtime.
 *
 *  Until the template is configured, isSurveyConfigured() returns false and
 *  the EndOfShowCard falls back to instructing the user to fill out the
 *  questionnaire manually.
 */

export const WELCOME_SEEN_KEY = 'attune.welcomeSeen';
export const PARTICIPANT_ID_KEY = 'attune.participantId';

export const SURVEY_URL_TEMPLATE =
  'https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/viewform?usp=pp_url&entry.000000=__PID__';

export function buildSurveyUrl(participantId: string): string {
  return SURVEY_URL_TEMPLATE.replace('__PID__', encodeURIComponent(participantId));
}

export function isSurveyConfigured(): boolean {
  return !SURVEY_URL_TEMPLATE.includes('REPLACE_WITH_FORM_ID');
}
